import {
  FaShip,
  FaTruck,
  FaWarehouse,
  FaFileContract,
  FaGlobeAmericas,
  FaHandshake,
  FaBoxOpen,
  FaLeaf,
  FaPepperHot,
  FaCog,
  FaTshirt,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

const icons = {
  ship: FaShip,
  truck: FaTruck,
  warehouse: FaWarehouse,
  document: FaFileContract,
  globe: FaGlobeAmericas,
  handshake: FaHandshake,
  box: FaBoxOpen,
  leaf: FaLeaf,
  spice: FaPepperHot,
  coconut: FaLeaf,
  gear: FaCog,
  shirt: FaTshirt,
  event: FaCalendarAlt,
  team: FaUsers,
  import: FaShip,
  export: FaShip,
  logistics: FaTruck,
  cargo: FaWarehouse,
  customs: FaFileContract,
  distribution: FaGlobeAmericas,
  consulting: FaHandshake,
};

export default function ServiceIcon({ name, className = "h-8 w-8" }) {
  const Icon = icons[name] || FaBoxOpen;
  return <Icon className={className} />;
}
