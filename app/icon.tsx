import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#111111FF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#EAEAEAFF"
        }}
      >
        NS
      </div>
    ),
    {
      ...size
    }
  );
}
