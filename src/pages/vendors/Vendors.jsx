import { useDispatch, useSelector } from "react-redux";
import { changePageNumber, updateList } from "../../redux/vendors/vendorsSlice";
import { Card } from "./components/card/Card";
import "./vendors.scss";
import { useEffect, useState } from "react";
import { getPaginatedVendors } from "../../services/vendors/vedors.service";
import { UiVirtualScroll } from "./containers/ui-virtual-scroll/UiVirtualScroll";

const buffer = 3 * 10;
const cache = buffer - 10;

export const Vendors = () => {
  const [loading, setLoading] = useState(false);
  const pageNumber = useSelector((state) => state.vendors.pageNumber);
  const vendors = useSelector((state) => state.vendors.data);
  console.log(vendors);
  const dispatch = useDispatch();

  const prevCallback = async (newOffset) => {
    setLoading(true);
    const res = await getPaginatedVendors(35.754, 51.328, newOffset, 10);
    if (res.status) {
      const data = res.data.finalResult.filter(
        (item) => item.type === "VENDOR"
      );
      const newData = [...data, ...vendors.slice(0, cache)];
      dispatch(updateList(newData));
    }
    setLoading(false);
  };

  const nextCallback = async (newOffset) => {
    setLoading(true);
    const res = await getPaginatedVendors(35.754, 51.328, newOffset, 10);
    if (res.status) {
      const data = res.data.finalResult.filter(
        (item) => item.type === "VENDOR"
      );
      const newData = [...vendors.slice(-cache), ...data];
      dispatch(updateList(newData));
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getPaginatedVendors(35.754, 51.328, 0, buffer);
      // console.log("first", res.count, res.open_count);
      if (res.status) {
        const data = res.data.finalResult.filter(
          (item) => item.type === "VENDOR"
        );
        dispatch(updateList(data));
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <div>در حال بارگزاری ...</div>;
  if (vendors.length > 0) {
    return (
      <div className="vendors">
        <UiVirtualScroll
          buffer={buffer}
          rowHeight={270}
          height="100vh"
          limit={10}
          onPrevCallback={prevCallback}
          onNextCallback={nextCallback}
        >
          {vendors.map(({ data }) => (
            <Card
              key={data.id}
              menuUrl={data.menuUrl}
              title={data.title}
              coverPath={data.backgroundImage}
              logo={data.logo}
              voteCount={data.voteCount}
              rate={data.rate}
              description={data.description}
              isZFExpress={data.isZFExpress}
              deliveryFee={data.deliveryFee}
              has_coupon={data.has_coupon}
              best_coupon={data.best_coupon}
            />
          ))}
        </UiVirtualScroll>
      </div>
    );
  }
  return null;
};
