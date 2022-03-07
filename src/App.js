import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import {Button} from 'components/ui/Button';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      <Header height="100"/>
      <AppRouter/>
    </div>
  );
    return (
        <div className="App">
            <Button variant="contained" color="primary">
                Not registered yet? Signup
            </Button>
        </div>
    );
};


export default App;
