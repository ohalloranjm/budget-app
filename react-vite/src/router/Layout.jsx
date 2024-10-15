import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import SessionPrompt from "../components/LandingPage/SessionPrompt";
import Footer from "../components/Footer";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((store) => store.session.user);
  const content = user ? <Outlet /> : <SessionPrompt />;

  return (
    <>
      <ModalProvider>
        <Navigation />
        <div id="page-content">{isLoaded && content}</div>
        <Footer />
        <Modal />
      </ModalProvider>
    </>
  );
}
