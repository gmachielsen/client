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

     <>
        <Link href="/">
          <img src={require("../public/logo.png")} style={{ height: "50px" }} />
        </Link>
     
        <Link href="/courses">
          <a>Courses</a>
        </Link>
        </>
      {user !== null && (
        <>
            {user !== null && user.role.includes("ApprovedApplicant") && 
        
                <Link href="/user/become-instructor">
                    <a>Become Instructor</a>
                </Link>
            }
            {user !== null && user.role.includes("Instructor") &&

                <Link href="/instructor/course/create">
                    <a>Create Course</a>
                </Link>
            }
        </>
      )}
    

       <>
             {user === null && (

            <Link href="/auth/login">
                <a>Login</a>
            </Link>        
   
            <Link href="/auth/register">
                <a>Register</a>
            </Link> 
                 )}
       
       </>

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
              {!user.role.includes("Admin") && !user.role.includes("Instructor") && !user.role.includes("Applicant") && !user.role.includes("ApprovedApplicant") &&
                <Item href="/user/apply/apply">
                <Link href="/user/apply/apply">
                  <a>Apply for Instructor</a>
                  </Link>
                </Item>
              }
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

  );
};

export default TopNav;


