import Link from "next/link";

const styles = require("./NavItem.css");

interface Props {
  href: string;
  children: string;
}

export default ({ href, children }: Props) => (
  <Link href={href}>
    <a className={styles.root}>{children}</a>
  </Link>
);
