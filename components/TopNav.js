import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
  RedditSquareFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/auth/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" style={{ fontFamily: 'serif', fontSize: '17px', fontWeight: '600'}} >

      {/* style={{ display: "contents"}} */}
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        // icon={<AppstoreOutlined />}
    
      >
        <Link href="/">
          <img src={require("../public/logo.png")} style={{ height: "50px" }} />
          {/* <a>App</a> */}
        </Link>
      </Item>
      <Item
        key="/courses"
        onClick={(e) => setCurrent(e.key)}
    
      >
        <Link href="/courses">
          <a>Courses</a>
        </Link>
      </Item>
      {user !== null && (
        <>
                 {/* {!user.role.includes("Admin") && !user.role.includes("Instructor") && !user.role.includes("Applicant") && !user.role.includes("ApprovedApplicant") && user.role.includes("Subscriber")  &&
                <Item href="/user/apply/apply">
                <Link href="/user/apply/apply">
                  <a>Apply for Instructor</a>
                  </Link>
                </Item>
              } */}
      {/* {user.role.includes("Subscriber") && 
        <Item href="/user/apply/apply">
          <Link href="/user/apply/apply">
            <a>apply for instructor</a>
          </Link>
        </Item>
      } */}
      {user.role.includes("ApprovedApplicant") &&
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          // icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      }
      {user !== null && user.role.includes("Instructor") &&
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          // icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      }
      </>
      )}
    

     {user === null && (
       <>
          <Item
            key="/auth/login"
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/auth/login">
                <a>Login</a>
            </Link>        
          </Item>
          <Item
            key="/auth/register"
            onClick={(e) => setCurrent(e.key)}
          >
            <Link href="/auth/register">
                <a>Register</a>
            </Link>        
          </Item>
       </>
     )}

      {user !== null && (
        <SubMenu icon={<UserOutlined />} title={user && user.name} className="float-right">
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              {user && user.role && user.role.includes("Admin") && (
                  <Item 
                    key="/admin" onClick={(e) => setCurrent(e.key)}
                    className="float-right" style={{}}
                  >
                    <Link href="/admin">
                      <a>AdminDashboard</a>
                    </Link>  
                  </Item>    
              )} 
     
              { user && user.role && user.role.includes("Instructor") && (
                  <Item
                    key="/instructor"
                    onClick={(e) => setCurrent(e.key)}
                    // icon={<TeamOutlined />}
                    className="float-right"
                  >
                    <Link href="/instructor">
                      <a>InstructorDashboard</a>
                    </Link>
                  </Item>
              )}
          
              
              <Item onClick={logout} icon={<LogoutOutlined />} className="float-right" style={{}}>
                Logout
              </Item>

            </ItemGroup>

        </SubMenu>
      )}

    </Menu>
  );
};

export default TopNav;





 {/* {user && user.role && user.role.includes("Instructor") ? (
               <Item
               key="/instructor/course/create"
               onClick={(e) => setCurrent(e.key)}
               icon={<CarryOutOutlined />}
             >
               <Link href="/instructor/course/create">
                 <a>Create Course</a>
               </Link>
             </Item>
      ) : (
            <Item
              key="/user/become-instructor"
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
            >
              <Link href="/user/become-instructor">
                <a>Become Instructor</a>
              </Link>
            </Item>
        )} */}

        {/* {user && user.role && user.role.includes("Applicant") ? (
            <Item
              key="/user/become-instructor"
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
            >
              <Link href="/user/become-instructor">
                <a>Become Instructor</a>
              </Link>
            </Item>
        ): (
          <Item
            key="/h/apply-for-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
          <Link href="/h/appy-for-instructor">
            <a>haha</a>
          </Link>
        </Item>
        )} */}