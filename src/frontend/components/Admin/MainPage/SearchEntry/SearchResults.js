import Link from "next/link";
import styles from "./SearchEntry.module.css";
import CloseIcon from "@mui/icons-material/Close";

const SearchResult = (props) => {
  return (
    <div className={styles.resultContainer}>
      <button className={styles.closeButton} onClick={props.closeModal}>
        <CloseIcon fontSize="large"></CloseIcon>
      </button>
      {/* Artists */}
      {props.searchResult.artists.length > 0 && (
        <div>
          <h3 className={styles.resultHeader}>Artists</h3>
          {props.searchResult.artists.map((artist, index) => (
            <Link
            href={`/artist/profile/${artist.userID}`}
            passHref
            legacyBehavior
          >
            <p
              className={styles.resultLink}
              key={`artist-${artist.userID}-${index}`}
            >
              {artist.name}
            </p>
            </Link>
          ))}
        </div>
      )}

      {/* Collectors */}
      {props.searchResult.collectors.length > 0 && (
        <div>
          <h3 className={styles.resultHeader}>Collectors</h3>
          {props.searchResult.collectors.map((collector, index) => (
            <Link
            href={`/collector/profile/${collector.userID}`}
            passHref
            legacyBehavior
          >
            <p
              className={styles.resultLink}
              key={`collector-${collector.userID}-${index}`}
            >
              {collector.name}
            </p>
          </Link>
          ))}
        </div>
      )}

      {/* Auctions */}
      {props.searchResult.auctions.length > 0 && (
        <div>
          <h3 className={styles.resultHeader}>Auctions</h3>
          {props.searchResult.auctions.map((auction, index) => (
            <Link
              href={`/admin/information/auctioninfo/${auction.auctionID}`}
              passHref
              legacyBehavior
            >
              <p
                className={styles.resultLink}
                key={`auction-${auction.auctionID}-${index}`}
              >
                {auction.title}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Exhibitions */}
      {props.searchResult.exhibitions.length > 0 && (
        <div>
          <h3 className={styles.resultHeader}>Exhibitions</h3>
          {props.searchResult.exhibitions.map((exhibition, index) => (
            <p
              className={styles.resultLink}
              key={`exhibition-${exhibition.exhibitionID}-${index}`}
            >
              {exhibition.exhibitionName}
            </p>
          ))}
        </div>
      )}

      {/* Collections */}
      {props.searchResult.collections.length > 0 && (
        <div>
          <h3 className={styles.resultHeader}>Collections</h3>
          {props.searchResult.collections.map((collection, index) => (
            <p
              className={styles.resultLink}
              key={`collection-${collection.collectionID}-${index}`}
            >
              {collection.collectionName}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
``;
