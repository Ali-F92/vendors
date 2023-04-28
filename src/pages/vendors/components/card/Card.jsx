import { Link } from "react-router-dom";
import "./card.scss";

const convertRateClassName = (rate) =>
  rate >= 4.5
    ? "45"
    : rate >= 4
    ? "40"
    : rate >= 3.5
    ? "35"
    : rate >= 3
    ? "30"
    : rate >= 2.5
    ? "25"
    : rate >= 2
    ? "20"
    : rate >= 1.5
    ? "15"
    : "10";

export const Card = ({
  menuUrl,
  coverPath,
  //   backgroundImage,
  logo,
  title,
  description,
  rate,
  voteCount,
  isZFExpress,
  deliveryFee,
  has_coupon,
  best_coupon,
}) => {
  return (
    <div className="card">
      <Link to={menuUrl}>
        <section className="card__header">
          <div className="cover">
            <img src={coverPath} alt={title} />
          </div>
          <div className="logo">
            <img src={logo} alt={title} />
          </div>
          {has_coupon && (
            <div className="best-coupon">
              <div>
                <div>
                  <div>
                    <div>{best_coupon}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="card__content">
          <div className="header">
            <div className="header__right">
              <h3>{title}</h3>
            </div>
            <div className="header__left">
              <div className="count">({voteCount.toLocaleString()})</div>
              <div className={`rate rate--upper${convertRateClassName(rate)}`}>
                <span>{rate}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill={`var(--starcolor-${convertRateClassName(rate)})`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                      fill="var(--starcolor-default)"
                    ></path>
                    <path
                      d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                      fill="var(--starcolor-default)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="description">{description}</div>
          <div className="delivery">
            <div className="delivery__right">
              <span>{isZFExpress ? "ارسال اکسپرس" : "پیک فروشنده"}</span>
              <span>{deliveryFee.toLocaleString()}</span>
              <span>تومان</span>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
};
