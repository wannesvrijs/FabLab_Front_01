import { useEffect } from "react";

export default ({ data }) => {
  data["hydra:member"].map((item) => <p>dd</p>);

  return (
    <>
      {/* shop categories with nested items */}
      {data["hydra:member"].map((categorie) => {
        return (
          <>
            <h3>{categorie.scatNaam}</h3>
            <table>
              {categorie.shopmaterialen.map((materiaal) => (
                <tr>
                  <td>
                    <div
                      className={
                        materiaal.smatInStock ? "in_stock" : "out_of_stock"
                      }
                    ></div>
                  </td>
                  <td>{materiaal.smatNaam}</td>
                  <td>{materiaal.smatPrijs}</td>
                </tr>
              ))}
            </table>
          </>
        );
      })}
    </>
  );
};
