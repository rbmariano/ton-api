import "./bootstrap";
import http from "http";
import colors from "colors/safe";

import app from "./app/app";

const Environment = process.env.NODE_ENV || "development";

class Server {
  public static Init(): void {
    Server.CreateHttpServer();
  }

  private static CreateHttpServer(): http.Server {
    const Port = process.env.API_PORT || 3000;
    const server = http.createServer(app);

    server.on("listening", () => {
      console.log(
        `[${colors.green(`${Environment}`)}] - Server running ${colors.yellow(
          "HTTP"
        )} on port ${colors.yellow(`${Port}`)}`
      );
    });

    server.listen(Port);
    return server;
  }
}

Server.Init();
