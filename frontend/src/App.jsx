import Chat from "./components/Chat.jsx";


export default function App(){
  return (
      <div>
        <div className="flex justify-center gap-2 mt-4 text-sm">
          <img className={'w-4'} src={'https://brandlogos.net/wp-content/uploads/2025/02/apple_intelligence-logo_brandlogos.net_zmypw-512x504.png'}/>
          <h1>Airbnb intelligence</h1>
        </div>

        <Chat/>
      </div>
  );
}