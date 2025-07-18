import { Poll } from "@/lib/types/Poll";
import { NextRequest } from "next/server";

// Map to manage all active SSE connections
const connections = new Map<string, ReadableStreamDefaultController>();

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    const stream = new ReadableStream({
        start(controller) {
            // Add connection to map
            const connectionId = `${pollId}-${Date.now()}`;
            connections.set(connectionId, controller);

            const encoder = new TextEncoder();

            // Confirm initial connection
            controller.enqueue(
                encoder.encode(
                    `data: {"type": "connected", "pollId": "${pollId}"}\n\n`
                )
            );

            // Keep-alive every 30 seconds
            const keepAlive = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(`: keep-alive\n\n`));
                } catch {
                    clearInterval(keepAlive);
                    connections.delete(connectionId);
                }
            }, 30000);

            // Handle connection close
            request.signal.addEventListener("close", () => {
                console.log(`SSE connection closed for poll ${pollId}`);
                clearInterval(keepAlive);
                connections.delete(connectionId);
                try {
                    controller.close();
                } catch {
                    // Connection already closed
                    connections.delete(connectionId);
                }
            });
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

export function broadcastPollUpdate(pollId: string, pollData: Poll) {
    const encoder = new TextEncoder();
    const message = JSON.stringify({
        type: "poll_update",
        pollId,
        data: pollData,
        timestamp: new Date().toISOString(),
    });

    connections.forEach((controller, connectionId) => {
        if (connectionId.startsWith(pollId)) {
            try {
                controller.enqueue(encoder.encode(`data: ${message}\n\n`));
            } catch {
                connections.delete(connectionId);
            }
        }
    });
}
