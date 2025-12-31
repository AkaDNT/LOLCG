"use client";

import { logout, setCredentials } from "@/features/auth/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const { accessToken, userId } = useAppSelector((s) => s.auth);

  return (
    <main style={{ padding: 24 }}>
      <h1>RTK OK</h1>
      <p>userId: {userId ?? "(null)"}</p>
      <p>token: {accessToken ?? "(null)"}</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button
          onClick={() =>
            dispatch(
              setCredentials({ accessToken: "demo-token", userId: "u1" })
            )
          }
        >
          Login demo
        </button>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </main>
  );
}
