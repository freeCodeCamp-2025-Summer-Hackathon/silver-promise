import { NextRequest } from "next/server";
import { SSEService } from "@/lib/services/sseService";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    console.log(`New SSE connection request for poll: ${pollId}`);

    const stream = new ReadableStream({
        start(controller) {
            const connectionId = `poll-${pollId}-${Date.now()}`;

            // Add to singleton service
            SSEService.addConnection(connectionId, controller, `poll:${pollId}`);

            // Send initial connection message
            try {
                const encoder = new TextEncoder();
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({
                        type: "connected",
                        connectionId,
                        pollId,
                        timestamp: new Date().toISOString()
                    })}\n\n`)
                );
            } catch (error) {
                console.error("Failed to send initial message:", error);
            }

            // Keep-alive every 30 seconds
            const keepAlive = setInterval(() => {
                if (!SSEService.sendKeepAlive(connectionId)) {
                    clearInterval(keepAlive);
                }
            }, 30000);

            // Handle connection close
            request.signal.addEventListener("close", () => {
                console.log(`SSE connection closed for connection ${connectionId}`);
                clearInterval(keepAlive);
                SSEService.removeConnection(connectionId);
            });

            // Log current state
            console.log("Current SSE state:", SSEService.getDebugInfo());
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Cache-Control",
        },
    });
}