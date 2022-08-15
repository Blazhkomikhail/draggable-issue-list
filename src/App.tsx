import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main/Main";
import IssuesContextProvider from "./context/IssuesContext";

function App() {
  return (
    <IssuesContextProvider>
      <div className="App">
        <Main />
      </div>
    </IssuesContextProvider>
  );
}

export default App;
