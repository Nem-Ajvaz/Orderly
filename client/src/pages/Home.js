import orderlyimg from "../assets/images/orderly.gif";
import PriorityList from "../pages/PriorityList";
import Auth from "../utils/auth";

const Home = () => {
  return (
    <main>
      {Auth.loggedIn() ? (
        <div>
          <PriorityList />
        </div>
      ) : (
        <img style={{ width: "100%" }} src={orderlyimg} />
      )}
    </main>
  );
};

export default Home;
