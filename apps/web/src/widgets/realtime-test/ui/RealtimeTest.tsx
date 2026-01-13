"use client";

import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "@/shared/api/socket";
import { useAppSelector } from "@/shared/store";

export function RealtimeTest() {
  const token = useAppSelector((s) => s.auth.accessToken);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const s = connectSocket(token ?? undefined);

    const onReady = (p: any) =>
      setLog((x) => [`conn:ready ${JSON.stringify(p)}`, ...x]);
    const onPong = (p: any) =>
      setLog((x) => [`match:pong ${JSON.stringify(p)}`, ...x]);
    const onJoined = (p: any) =>
      setLog((x) => [`match:joined ${JSON.stringify(p)}`, ...x]);
    const onState = (p: any) =>
      setLog((x) => [`match:state ${JSON.stringify(p)}`, ...x]);
    const onErr = (p: any) =>
      setLog((x) => [`match:error ${JSON.stringify(p)}`, ...x]);

    s.on("conn:ready", onReady);
    s.on("match:pong", onPong);
    s.on("match:joined", onJoined);
    s.on("match:state", onState);
    s.on("match:error", onErr);

    return () => {
      s.off("conn:ready", onReady);
      s.off("match:pong", onPong);
      s.off("match:joined", onJoined);
      s.off("match:state", onState);
      s.off("match:error", onErr);
      disconnectSocket();
    };
  }, [token]);

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => connectSocket(token ?? undefined).emit("match:ping")}
        >
          Ping
        </button>
        <button
          onClick={() =>
            connectSocket(token ?? undefined).emit("match:join", {
              matchId: "m1",
            })
          }
        >
          Join match m1
        </button>
        <button
          onClick={() =>
            connectSocket(token ?? undefined).emit("match:leave", {
              matchId: "m1",
            })
          }
        >
          Leave match m1
        </button>
      </div>

      <pre
        style={{
          marginTop: 12,
          background: "#111",
          color: "#0f0",
          padding: 12,
        }}
      >
        {log.slice(0, 12).join("\n")}
      </pre>
    </div>
  );
}
