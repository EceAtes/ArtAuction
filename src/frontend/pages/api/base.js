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
export const API_ADMIN_GET_ENDED_AUCTIONS =`${BASE_URL}admin/get_ended_auctions`; 

//EDITOR PICKS URLS
export const API_EDITOR_PICKS_HIGHLIGHTED_ARTUSERS = `${BASE_URL}editors-picks/highlighted_artusers`;
export const API_EDITOR_PICKS_HIGHLIGHTED_AUCTIONS = `${BASE_URL}editors-picks/highlighted_auctions`;
export const API_EDITOR_PICKS_EXHIBITIONS = `${BASE_URL}editors-picks/exhibitions`;

//AUCTION URLS
export const API_AUCTION_GET_SINGLE_AUCTION = `${BASE_URL}auction/`;

//ART USERS URLS
export const API_ART_USER_FILTER_PEOPLE = `${BASE_URL}art-user/filter-people`;

//ARTIST URLS
export const API_ARTIST_ARTISTINFO = `${BASE_URL}artist/artist`; 

//COLLECTOR URLS
