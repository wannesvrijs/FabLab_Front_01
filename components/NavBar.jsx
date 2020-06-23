import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import Icon from "../public/Icon";
import { useState } from "react";

export default () => {
  const router = useRouter();
  const [mainDropdown, setMainDropdown] = useState(false);
  const [subDropdown, setSubDropdown] = useState(false);

  const toggleMainDropdown = () => {
    setMainDropdown(!mainDropdown);
  };

  const toggleSubDropdown = () => {
    setSubDropdown(!subDropdown);
  };

  return (
    <>
      <nav className="navigatie">
        <div>
          <Link href="/">
            <a
              className={classNames({
                navigation_active: router.pathname === "/",
              })}
            >
              FabLab Genk
            </a>
          </Link>

          <div
            onClick={toggleMainDropdown}
            className={classNames("hamburger", {
              hamburger_open: mainDropdown,
            })}
          ></div>
        </div>
        <ul
          className={classNames({
            nav_maindropdown_open: mainDropdown,
          })}
        >
          <li>
            <Link href="/machines">
              <a
                className={classNames({
                  navigation_active: router.pathname === "/machines",
                })}
              >
                Machines
              </a>
            </Link>
          </li>
          <li>
            <Link href="/materiaal_prijzen">
              <a
                className={classNames({
                  navigation_active: router.pathname === "/materiaal_prijzen",
                })}
              >
                Materiaal & prijzen
              </a>
            </Link>
          </li>
          <li>
            <Link href="/fabmoments">
              <a
                className={classNames({
                  navigation_active: router.pathname === "/fabmoments",
                })}
              >
                Fabmoments
              </a>
            </Link>
          </li>
          <li>
            <a onClick={toggleSubDropdown}>Info</a>
            <ul
              className={classNames({
                nav_subdropdown_open: subDropdown,
              })}
            >
              <li>
                <Link href="/info/fablab">
                  <a
                    className={classNames({
                      navigation_active: router.pathname === "/info/fablab",
                    })}
                  >
                    Fablab?
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/huisregels">
                  <a
                    className={classNames({
                      navigation_active: router.pathname === "/info/huisregels",
                    })}
                  >
                    Huisregels
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/faq">
                  <a
                    className={classNames({
                      navigation_active: router.pathname === "/info/faq",
                    })}
                  >
                    FAQ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/stages">
                  <a
                    className={classNames({
                      navigation_active: router.pathname === "/info/stages",
                    })}
                  >
                    Stages
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/contact">
              <a
                className={classNames({
                  navigation_active: router.pathname === "/contact",
                })}
              >
                Contact
              </a>
            </Link>
          </li>
          <li>
            <Link href="/account">
              <a
                className={classNames(
                  "nav_account",
                  {
                    navigation_active: router.pathname === "/account",
                  },
                  { navigation_active: router.pathname === "/account/login" },
                  {
                    navigation_active:
                      router.pathname === "/account/registreer",
                  }
                )}
              >
                <Icon className="profilepic" />
                <span>Mijn Account</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
