import { MockKiCadClient, type IKiCadClient } from '@spark-apps/kicad-client';

/**
 * KiCad service for MCP tools
 * Provides a singleton instance of the KiCad client
 */
export class KiCadService {
  private static client: IKiCadClient | null = null;

  /**
   * Get or create the KiCad client instance
   */
  static getClient(): IKiCadClient {
    if (!this.client) {
      // For now, use MockKiCadClient
      // In the future, this will be replaced with IPCKiCadClient
      this.client = new MockKiCadClient();
    }
    return this.client;
  }

  /**
   * Ensure the client is connected
   */
  static async ensureConnected(): Promise<void> {
    const client = this.getClient();
    if (!client.isConnected()) {
      await client.connect();
    }
  }

  /**
   * Disconnect the client
   */
  static async disconnect(): Promise<void> {
    if (this.client && this.client.isConnected()) {
      await this.client.disconnect();
    }
  }

  /**
   * Reset the client (useful for testing)
   */
  static reset(): void {
    this.client = null;
  }
}
