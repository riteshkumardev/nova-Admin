import { Layout } from "antd";
import React, { Suspense, lazy, useState, useEffect } from "react";

import TopAppBar from "../nav/TopAppBar";
import LoadingSpinner from "../../app/common/LoadingSpinner";
import { Outlet, useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import { selectRequestedUrl } from "./homeSlice";
import { useSelector } from "react-redux";
const SideBar = lazy(() => import("../nav/SideBar"));
const SideBarPhone = lazy(() => import("../nav/SideBarPhone"));

function Home() {
  const { Header, Content, Footer } = Layout;
  const windowsize = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const requestedUrl = useSelector(selectRequestedUrl);
  const navigate = useNavigate();
  useEffect(() => {
    if (requestedUrl.startsWith("/home")) {
      navigate(requestedUrl);
    }
  }, []);

  return (
    <>
      <Layout hasSider={true} style={{ height: "100vh" }}>
        {windowsize.width < 500 ? (
          <SideBarPhone collapsed={collapsed} />
        ) : (
          <SideBar />
        )}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              height: "45px",
              lineHeight: "45px",
            }}
          >
            <TopAppBar
              collapsed={collapsed}
              onCollapse={setCollapsed}
              width={windowsize.width}
            />
          </Header>
          <Content
            style={{
              display: "block",
              overflow: "scroll",
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </Content>
          <Footer
            style={{ textAlign: "center", height: "20px", padding: "0px" }}
          >
            Nova ©2021 Created by Abhinav Reddy
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
