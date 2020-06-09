import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import Icon from "../public/Icon";

export default () => {
  const router = useRouter();
  return (
    <>
      <nav className="navigatie">
        <div>
          <a
            className={classNames({
              navigation_active: router.pathname === "/contact",
            })}
          >
            FabLab Genk
          </a>
          <div className="hamburger"></div>
        </div>
        <ul>
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
            <a>Info</a>
            <ul>
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
                className={classNames({
                  navigation_active: router.pathname === "/account",
                })}
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
