import { getCabins } from "../_lib/data-service";

async function CabinsNum() {
  const cabinsNum = (await getCabins()).length;
  return <span>{cabinsNum}</span>;
}

export default CabinsNum;
