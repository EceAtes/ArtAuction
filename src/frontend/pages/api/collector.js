import{
    API_COLLECTOR_ONGOING_AUCTIONS,
    API_COLLECTOR_PAST_AUCTIONS,
    API_COLLECTOR_SAVED_AUCTIONS,
    API_COLLECTOR_LIST_COLLECTIONS,
    API_COLLECTOR_BID,
    API_COLLECTOR_BID_HISTORY,
    API_COLLECTOR_CREATE_COLLECTION,
    API_COLLECTOR_DELETE_COLLECTION,
    API_COLLECTOR_ADD_AUCTION_MENU,
    API_COLLECTOR_ADD_AUCTION_TO_COLLECTION,
    API_COLLECTOR_REMOVE_AUCTION_FROM_COLLECTION,
    API_COLLECTOR_GET_TOKENS,
    API_COLLECTOR_GET_COLLECTOR_INFO
} from "./base";

//ARTIST INFO
/*export const artistGetArtistInfoApiFunction = async (userID) => {
    const res = await fetch(API_ARTIST_ARTISTINFO, {
      method: "PATCH",
      body: JSON.stringify({ userID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("auction failed!");
    }
  };
*/

//GET ongoingAuctions AUCTIONS
export const collectorGetOngoingAuctionsApiFunction = async (userID) => {
    const res = await fetch(API_COLLECTOR_ONGOING_AUCTIONS + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("onging auction failed!");
    }
  };
  
  //GET pastAuctions AUCTIONS
  export const collectorGetPastAuctionsApiFunction = async (userID) => {
    const res = await fetch(API_COLLECTOR_PAST_AUCTIONS + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("past auction failed!");
    }
  };

  //GET savedAuctions AUCTIONS
  export const collectorGetSavedAuctionsApiFunction = async (userID) => {
    const res = await fetch(API_COLLECTOR_SAVED_AUCTIONS + "/"+ userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("saved auction failed!");
    }
  };

//GET allCollections AUCTIONS
export const collectorGetAllCollectionsApiFunction = async (userID) => {
    const res = await fetch(API_COLLECTOR_LIST_COLLECTIONS + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("get all collections failed!");
    }
  };

  //GET singleCollection AUCTIONS
export const collectorGetSingleCollectionApiFunction = async (collectionID) => {
    const res = await fetch(API_COLLECTOR_LIST_COLLECTIONS + collectionID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("get all collections failed!");
    }
  };

    //POST place bid
    export const collectorBidApiFunction = async (collectorID, auctionID, bidAmount) => {
      try {
          const payload = { collectorID, auctionID, bidAmount };
          console.log('Request Payload:', payload);
          const requestBody = {
            collectorID: collectorID,
            auctionID: auctionID,
            bidAmount: bidAmount,
        };
          const res = await fetch(API_COLLECTOR_BID, {
              method: "POST",
              body: JSON.stringify(requestBody),
              headers: {
                  "Content-Type": "application/json",
              },
          });
  
          if (!res.ok) {
              const errorText = await res.text();
              console.error(`Error placing bid. Server response: ${errorText}`);
              throw new Error("Place bid failed!");
          }
  
          return res.text();
      } catch (error) {
          console.error("Error placing bid:", error.message);
          throw error;
      }
  };
  
  

//patch collector bid history 
export const collectorBidHistoryApiFunction = async (
    userID,
    auctionID
  ) => {
    const res = await fetch(API_COLLECTOR_BID_HISTORY, {
      method: "PATCH",
      body: JSON.stringify({ userID, auctionID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("collector bid history failed!");
    }
  };

//create collection
export const collectorCreateCollectionApiFunction = async (
    user_id,
    name,
    auction_id
    ) =>{
        const res = await fetch(API_COLLECTOR_CREATE_COLLECTION , {
            method: "POST",
            body: JSON.stringify ({user_id,name,auction_id}),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("create collection failed!");
        }
    };

// delete collection
export const collectorDeleteCollectionApiFunction = async (
    collectionID
    ) =>{
        const res = await fetch(API_COLLECTOR_DELETE_COLLECTION, {
            method: "POST",
            body: JSON.stringify ({collectionID}),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("create collection failed!");
        }
    };

//add auction menu
export const collectorAddAuctionMenuApiFunction = async (
    auctionID
    ) =>{
        const res = await fetch(API_COLLECTOR_ADD_AUCTION_MENU, {
            method: "POST",
            body: JSON.stringify ({auctionID}),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("add auction menu failed!");
        }
    };

//collector add auction to collection
export const collectorAddAuctionToCollectionApiFunction = async (
    collectionID,
    auctionID
    ) =>{
        const res = await fetch(API_COLLECTOR_ADD_AUCTION_TO_COLLECTION, {
            method: "POST",
            body: JSON.stringify ({collectionID, auctionID}),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("collector, add auction to collection failed!");
        }
    };
    
//collector remove auction from collection
export const collectorRemoveAuctionFromCollectionApiFunction = async (
    collectionID,
    auctionID
    ) =>{
        const res = await fetch(API_COLLECTOR_REMOVE_AUCTION_FROM_COLLECTION, {
            method: "POST",
            body: JSON.stringify ({collectionID, auctionID}),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("collector, remove auctions from collection failed!");
        }
    };

//collector remove auction from collection
export const collectorSaveApiFunction = async (
    data
    ) =>{
        const res = await fetch(API_COLLECTOR_REMOVE_AUCTION_FROM_COLLECTION, {
            method: "POST",
            body: JSON.stringify (data),
            header: {
                "Content-Type": "application/json",
            },
        });
        if( res.ok){
            return res.text();
        } else {
            throw new Error("collector, remove auctions from collection failed!");
        }
    };

//patch get tokens
export const collectorGetTokenApiFunction = async (
    userID,
    tokens
  ) => {
    const res = await fetch(API_COLLECTOR_GET_TOKENS, {
      method: "PATCH",
      body: JSON.stringify({ userID, tokens }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("collector get token failed!");
    }
  }; 
  
  //GET a single art user
  export const collectorGetCollectorInfoApiFunction = async (userID) => {
    const res = await fetch(API_COLLECTOR_GET_COLLECTOR_INFO + userID, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
      },
    });
  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("get single COLLECTOR failed!");
    }
  };
  