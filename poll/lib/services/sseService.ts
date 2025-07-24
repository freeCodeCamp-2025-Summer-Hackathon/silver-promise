export interface SSEConnection {
    id: string;
    controller: ReadableStreamDefaultController;
    topic: string;
    createdAt: Date;
}

class SSEServiceClass {
    private connections = new Map<string, SSEConnection>();
    private encoder = new TextEncoder();

    addConnection(
        connectionId: string,
        controller: ReadableStreamDefaultController,
        topic: string
    ): void {
        const connection: SSEConnection = {
            id: connectionId,
            controller,
            topic,
            createdAt: new Date(),
        };

        this.connections.set(connectionId, connection);
        console.log(`SSE connection added: ${connectionId} (topic: ${topic})`);
    }

    removeConnection(connectionId: string): void {
        const connection = this.connections.get(connectionId);
        if (connection) {
            try {
                connection.controller.close();
            } catch {
                // Already closed
            }
            this.connections.delete(connectionId);
            console.log(`SSE connection removed: ${connectionId}`);
        }
    }

    broadcastToTopic(topic: string, type: string, data: unknown): number {
        const formattedMessage = `data: ${JSON.stringify({
            type,
            data,
            timestamp: new Date().toISOString(),
        })}\n\n`;

        let sentCount = 0;
        const toRemove: string[] = [];

        this.connections.forEach((connection, connectionId) => {
            if (connection.topic === topic) {
                try {
                    connection.controller.enqueue(
                        this.encoder.encode(formattedMessage)
                    );
                    sentCount++;
                } catch (error) {
                    console.log(
                        `Failed to send to ${connectionId}, removing connection`
                    );
                    console.error("Error sending message:", error);
                    toRemove.push(connectionId);
                }
            }
        });

        // Clean up failed connections
        toRemove.forEach((id) => this.removeConnection(id));
        return sentCount;
    }

    getConnectionCount(topic?: string): number {
        if (topic) {
            return Array.from(this.connections.values()).filter(
                (conn) => conn.topic === topic
            ).length;
        }
        return this.connections.size;
    }

    sendKeepAlive(connectionId: string): boolean {
        const connection = this.connections.get(connectionId);
        if (!connection) return false;

        try {
            connection.controller.enqueue(
                this.encoder.encode(": keep-alive\n\n")
            );
            return true;
        } catch {
            this.removeConnection(connectionId);
            return false;
        }
    }

    // Debug method
    getDebugInfo() {
        const connectionsByTopic: Record<string, number> = {};
        this.connections.forEach((conn) => {
            connectionsByTopic[conn.topic] =
                (connectionsByTopic[conn.topic] || 0) + 1;
        });

        return {
            totalConnections: this.connections.size,
            connectionsByTopic,
            allConnectionIds: Array.from(this.connections.keys()),
        };
    }
}

// Export singleton instance
export const SSEService = new SSEServiceClass();
