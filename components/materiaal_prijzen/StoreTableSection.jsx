export default ({ categorie }) => {
  return (
    <div className="scat-row">
      <p className="scat-titel">{categorie.scatNaam}</p>
      <div className="sub-mat">
        {categorie.shopmaterialen.map((materiaal) => (
          <div className="sub-mat-item">
            <div
              className={`stock_indicator ${
                materiaal.smatInStock ? "in_stock" : "out_of_stock"
              }`}
            ></div>
            <p className="mat-afmeting">{materiaal.smatAfmeting}</p>
            <p className="mat-price">
              €{parseFloat(materiaal.smatPrijs).toFixed(2)}
              {materiaal.smatEenheid && `/${materiaal.smatEenheid}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
