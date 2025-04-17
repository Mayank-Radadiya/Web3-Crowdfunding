import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const contract = getContract({
  client,
  address: "0x8Bd9851C4968f9f5AE54441f7f69b6c115f2E409",
  chain: sepolia,
});
