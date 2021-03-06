// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { PoolClient } from "https://raw.githubusercontent.com/mandarineorg/mandarine-postgres/v1.0.1/client.ts";
import { Pool } from "https://raw.githubusercontent.com/mandarineorg/mandarine-postgres/v1.0.1/mod.ts";
import { QueryConfig, QueryResult } from "https://raw.githubusercontent.com/mandarineorg/mandarine-postgres/v1.0.1/query.ts";
import { Log } from "../../logger/log.ts";
import { Mandarine } from "../../main-core/Mandarine.ns.ts";
import { MandarineORMException } from "../core/exceptions/mandarineORMException.ts";

export interface PostgresConnectorInterface extends Mandarine.ORM.Connection.Connector {
    /** Client that maintains an external database connection. */
    clientPooler: Mandarine.ORM.Connection.ConnectorClient;
    
    /** Is the client connected to an external instance. */
    connected?: boolean;
    
    /** Connect to an external database instance. */
    makeConnection(): Promise<PoolClient>;
    
    /** Execute a query on the external database instance. */
    query(query: string | QueryConfig): Promise<QueryResult>;

    /** Execute a query on the external database instance with an existing connection. */
    queryWithConnection(connection: PoolClient, query: string | QueryConfig, releaseOnFinish: boolean): Promise<QueryResult>;
    
    /** Execute queries within a transaction on the database instance. */
    transaction?(queries: string[]): Promise<any[]>;
    
    /** Disconnect from the external database instance. */
    close?(): Promise<any>;
}

/**
* Connector for PostgreSQL
*/
export class PostgresConnector implements PostgresConnectorInterface {

    public clientPooler: Pool;
    public logger: Log = Log.getLogger(PostgresConnector);
  
    /** Create a PostgreSQL connection. */
    constructor(host: string, username: string, password: string, database: string, port: number, poolSize: number) {
      try {
        this.clientPooler = new Pool({
          hostname: host,
          user: username,
          password: password,
          database: database,
          port: port ?? 5432,
        }, poolSize ?? 100, true);
      } catch(error) {
        this.logger.compiler("Aborting database client", "error", error);
        throw new MandarineORMException(MandarineORMException.IMPOSSIBLE_CONNECTION, "PostgresConnector");
      }
    }
  
    public async makeConnection(): Promise<PoolClient> {
      try {
        return await this.clientPooler.connect();
      }catch(error) {
        this.logger.compiler("Database connection could not be reached", "error");
      }
    }

    public async query(query: string | QueryConfig): Promise<QueryResult> {
      try {
        let connection = await this.makeConnection();
        let result: Promise<QueryResult> = connection.query(query);
        return result;
      }catch(error) {
        this.logger.compiler("Query statement could not be executed", "error", error);
      }
    }

    public async queryWithConnection(connection: PoolClient, query: string | QueryConfig): Promise<QueryResult> {
      try {
        let result: Promise<QueryResult> = connection.query(query);
        return result;
      }catch(error) {
        this.logger.compiler("Query & connection have failed to be reached", "error", error);
      }
  }
}