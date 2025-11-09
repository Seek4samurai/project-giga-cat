import style from "../styles/UserTile.module.css";

const UserTile = ({ score }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.Badge}></div>
        <div className={style.Address}>
          {score ? `${score[0]?.slice(0, 6)}...${score[0]?.slice(39)}` : null}
        </div>
        <span className={style.Score}>{score ? score[1] : null} pts.</span>
      </div>
      <div className={style.container}>
        <div className={style.Badge}></div>
        <div className={style.Address}>
          {score[2]
            ? `${score[2]?.slice(0, 6)}...${score[2]?.slice(39)}`
            : null}
        </div>
        <span className={style.Score}>{score ? score[3] : null} pts.</span>
      </div>
      <div className={style.container}>
        <div className={style.Badge}></div>
        <div className={style.Address}>
          {score[4]
            ? `${score[4]?.slice(0, 6)}...${score[4]?.slice(39)}`
            : null}
        </div>
        <span className={style.Score}>{score[5] ? score[5] : null} pts.</span>
      </div>
    </>
  );
};

export default UserTile;
