import Link from "next/link";

const styles = require("./NavItem.css");

interface Props {
  href?: string;
  handleClick?: () => void;
  children: string;
}

export default ({ href, handleClick, children }: Props) => {
  const linkElt = href ? (
    <Link href={href}>
      <a className={styles.root}>{children}</a>
    </Link>
  ) : (
    <a className={styles.root} href="#" onClick={handleClick}>
      {children}
    </a>
  );

  return linkElt;
};
