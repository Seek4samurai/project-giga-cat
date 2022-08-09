import style from "../styles/UserTile.module.css";

const UserTile = ({ data }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.Badge}></div>
        <div className={style.Address}>
          {data.address?.slice(0, 6)}...{data.address?.slice(39)}
        </div>
        <span className={style.Score}>{data.score} pts.</span>
      </div>
    </>
  );
};

export default UserTile;
