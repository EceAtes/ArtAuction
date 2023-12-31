//BASE URL
const BASE_URL = "http://localhost:8000/";

//USER URLS
export const API_SIGN_UP = `${BASE_URL}signup`;
export const API_SIGN_IN = `${BASE_URL}signin`;
export const API_VERIFY_SALE = `${BASE_URL}verifySale`;

//ADMIN URLS
export const API_ADMIN_HOME = `${BASE_URL}admin/home`;
export const API_ADMIN_HIGHLIGHT_ARTUSER = `${BASE_URL}admin/highlight_artuser`;
export const API_ADMIN_HIGHLIGHT_AUCTION = `${BASE_URL}admin/highlight_auction`;
export const API_ADMIN_ADD_AUCTION_MENU = `${BASE_URL}admin/add_auction_menu`;
export const API_ADMIN_CREATE_EXHIBITION = `${BASE_URL}admin/create_exh`;
export const API_ADMIN_ADD_AUCTION_TO_EXHIBITION = `${BASE_URL}admin/add_auction_to_exh`;
export const API_ADMIN_REMOVE_AUCTION_FROM_EXHIBITION = `${BASE_URL}admin/remove_auction_from_exh`;
export const API_ADMIN_DELETE_EXHIBITION = `${BASE_URL}admin/delete_exh`;
export const API_ADMIN_EDIT_EXHIBITION = `${BASE_URL}admin/edit_exh`;
export const API_ADMIN_PROPOSED_AUCTIONS = `${BASE_URL}admin/proposed_auctions`;
export const API_ADMIN_VERIFY_AUCTION = `${BASE_URL}admin/verify_auction`;
export const API_ADMIN_GET_ENDED_AUCTIONS = `${BASE_URL}admin/get_ended_auctions`;

//EDITOR PICKS URLS
export const API_EDITOR_PICKS_HIGHLIGHTED_ARTUSERS = `${BASE_URL}editors-picks/highlighted_artusers`;
export const API_EDITOR_PICKS_HIGHLIGHTED_AUCTIONS = `${BASE_URL}editors-picks/highlighted_auctions`;
export const API_EDITOR_PICKS_EXHIBITIONS = `${BASE_URL}editors-picks/exhibitions`;

//AUCTION URLS
export const API_AUCTION_GET_SINGLE_AUCTION = `${BASE_URL}auction/`;
export const API_AUCTION_GET_POPULAR_AUCTIONS = `${BASE_URL}auction/getPopularAuction`;
export const API_AUCTION_GET_RECENT_AUCTIONS = `${BASE_URL}auction/getRecentAuction`;
export const API_AUCTION_CREATE = `${BASE_URL}auction/create`;
export const API_AUCTION_GET_ALL_BID_HISTORY= `${BASE_URL}auction/allBidHistory`;



//ART USERS URLS
export const API_ART_USER_FILTER_PEOPLE = `${BASE_URL}art-user/filter-people`;
export const API_ART_USER_TOP_COLLECTORS = `${BASE_URL}art-user/topCollectors`;
export const API_ART_USER_TOP_ARTISTS = `${BASE_URL}art-user/topArtists`;
export const API_ART_USER_AUCTIONS_FROM_PEOPLE_YOU_FOLLOW = `${BASE_URL}art-user/auctions-from-people-you-follow`;
export const API_ART_USER_SEARCH = `${BASE_URL}art-user/search`;

export const API_ART_USER_FOLLOW = `${BASE_URL}art-user/follow`;
export const API_ART_USER_UNFOLLOW = `${BASE_URL}art-user/unfollow`;
export const API_ART_USER_FOLLOWERS = `${BASE_URL}art-user/followers/`;
export const API_ART_USER_EDIT_INFO = `${BASE_URL}art-user/editInfo`;
export const API_ART_USER_GET_SINGLE_ART_USER = `${BASE_URL}art-user/art-users/`;

//ARTIST URLS
export const API_ARTIST_ARTISTINFO = `${BASE_URL}artist/artistInfo`;
export const API_ARTIST_GET_ENDED_AUCTIONS = `${BASE_URL}artist/getEndedAuctions/`;
export const API_ARTIST_NOT_APPROVED_AUCTIONS = `${BASE_URL}artist/notApprovedAuctions/`;
export const API_ARTIST_ONGOING_AUCTIONS = `${BASE_URL}artist/ongoingAuctions/`;
export const API_ARTIST_PAST_AUCTIONS = `${BASE_URL}artist/pastAuctions/`;


//COLLECTOR URLS
export const API_COLLECTOR_PROFILE = `${BASE_URL}collector/profile`;
export const API_COLLECTOR_ONGOING_AUCTIONS = `${BASE_URL}collector/ongoingAuctions/`;
export const API_COLLECTOR_PAST_AUCTIONS = `${BASE_URL}collector/pastAuctions/`;
export const API_COLLECTOR_SAVED_AUCTIONS = `${BASE_URL}collector/savedAuctions/`;
export const API_COLLECTOR_LIST_COLLECTIONS = `${BASE_URL}collector/collections/;
`
export const API_COLLECTOR_BID = `${BASE_URL}collector/bid`;
export const API_COLLECTOR_BID_HISTORY = `${BASE_URL}collector/bidHistory`;
export const API_COLLECTOR_CREATE_COLLECTION = `${BASE_URL}collector/create_col`;
export const API_COLLECTOR_DELETE_COLLECTION = `${BASE_URL}collector/delete_col`;
export const API_COLLECTOR_ADD_AUCTION_MENU = `${BASE_URL}collector/add_auction_menu`;
export const API_COLLECTOR_ADD_AUCTION_TO_COLLECTION = `${BASE_URL}collector/add_auction_to_col`;
export const API_COLLECTOR_REMOVE_AUCTION_FROM_COLLECTION = `${BASE_URL}collector/remove_auction_from_col`;
export const API_COLLECTOR_SAVE = `${BASE_URL}collector/save`;
export const API_COLLECTOR_GET_TOKENS = `${BASE_URL}collector/getTokens`;
export const API_COLLECTOR_GET_COLLECTOR_INFO = `${BASE_URL}collector/collectorInfo/`;
