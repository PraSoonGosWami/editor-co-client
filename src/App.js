import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = io("http://localhost:5000");
    s.emit("send-uid", "prasoon-goswami");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Hi </h1>
    </div>
  );
}

export default App;
