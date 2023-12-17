package com.example.artauction.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.AuctionDTO;
import com.example.artauction.dto.ExhibitionDTO;


@Repository
public class ExhibitionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExhibitionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    
    public List<ExhibitionDTO> listAllExhibitions() {
        String sql = "SELECT e.exhibitionID, e.exhibitionName, e.exhibitionDescriptor, " +
                     "GROUP_CONCAT(c.auctionID) AS auctionIDs " +
                     "FROM exhibition e " +
                     "LEFT JOIN curate c ON e.exhibitionID = c.exhibitionID " +
                     "GROUP BY e.exhibitionID";
    
        List<ExhibitionDTO> exhibitionDTOList = jdbcTemplate.query(sql, (resultSet, i) -> {
            ExhibitionDTO exhibitionDTO = new ExhibitionDTO();
            exhibitionDTO.setExhibitionID(resultSet.getInt("exhibitionID"));
            exhibitionDTO.setExhibitionName(resultSet.getString("exhibitionName"));
            exhibitionDTO.setExhibitionDescriptor(resultSet.getString("exhibitionDescriptor"));
    
            String auctionIDs = resultSet.getString("auctionIDs");
            if (auctionIDs != null) {
                String[] auctionIDArray = auctionIDs.split(",");
                for (String auctionID : auctionIDArray) {
                    String sqlAuction = "SELECT * FROM `Auction` WHERE `auctionID` = ?";
                    RowMapper<AuctionDTO> rowMapper = (rs, rowNum) -> {
                        AuctionDTO auction = new AuctionDTO();
                        auction.setAuctionID(Integer.parseInt(auctionID));
                        auction.setTitle(rs.getString("title"));
                        return auction;
                    };
                    AuctionDTO auction = jdbcTemplate.queryForObject(sqlAuction, rowMapper, Integer.parseInt(auctionID));
                    exhibitionDTO.getAuctions().add(auction);
                }
            }
            return exhibitionDTO;
        });
    
        return exhibitionDTOList;
    }
    
    public ExhibitionDTO listSingleExhibition(int exhibitionId ) {
        String sql = "SELECT e.exhibitionID, e.exhibitionName, e.exhibitionDescriptor, c.auctionID " +
                     "FROM exhibition e " +
                     "LEFT JOIN curate c ON e.exhibitionID = c.exhibitionID " +
                     "WHERE e.exhibitionID = ?";

        List<ExhibitionDTO> exhibitionDTOList = jdbcTemplate.query(sql, (resultSet, i) -> {
            ExhibitionDTO exhibitionDTO = new ExhibitionDTO();
            exhibitionDTO.setExhibitionID(resultSet.getInt("exhibitionID"));
            exhibitionDTO.setExhibitionName(resultSet.getString("exhibitionName"));
            exhibitionDTO.setExhibitionDescriptor(resultSet.getString("exhibitionDescriptor"));

            int auctionId = resultSet.getInt("auctionID");
            if (auctionId > 0) {
                String sqlAuction = "SELECT * FROM `Auction` WHERE `auctionID` = ?";
                RowMapper<AuctionDTO> rowMapper = (rs, rowNum) -> {
                    AuctionDTO auction = new AuctionDTO();
                    auction.setAuctionID(auctionId);
                    auction.setTitle(rs.getString("title"));
                    return auction;
                };
                AuctionDTO auction = jdbcTemplate.queryForObject(sqlAuction, rowMapper, auctionId);
                exhibitionDTO.getAuctions().add(auction);
            }

            return exhibitionDTO;
        },
        exhibitionId);

        if (exhibitionDTOList.isEmpty()) { return null; }
        ExhibitionDTO exhibitionDTO = exhibitionDTOList.get(0);

        return exhibitionDTO;
    }
    
}
