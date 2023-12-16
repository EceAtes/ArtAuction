package com.example.artauction.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.artauction.dto.ExhibitionDTO;


@Repository
public class ExhibitionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExhibitionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    
    public List<ExhibitionDTO> listAllExhibitions() {
        String sql = "SELECT e.exhibitionID, e.exhibitionName, e.exhibitionDescriptor, c.auctionID " +
                     "FROM exhibition e " +
                     "LEFT JOIN curate c ON e.exhibitionID = c.exhibitionID";

        List<ExhibitionDTO> exhibitionDTOList = jdbcTemplate.query(sql, (resultSet, i) -> {
            ExhibitionDTO exhibitionDTO = new ExhibitionDTO();
            exhibitionDTO.setExhibitionID(resultSet.getInt("exhibitionID"));
            exhibitionDTO.setExhibitionName(resultSet.getString("exhibitionName"));
            exhibitionDTO.setExhibitionDescriptor(resultSet.getString("exhibitionDescriptor"));

            int auctionId = resultSet.getInt("auctionID");
            if (auctionId > 0) {
                exhibitionDTO.getAuctions().add(auctionId);
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
                exhibitionDTO.getAuctions().add(auctionId);
            }

            return exhibitionDTO;
        },
        exhibitionId);

        if (exhibitionDTOList.isEmpty()) { return null; }
        ExhibitionDTO exhibitionDTO = exhibitionDTOList.get(0);

        return exhibitionDTO;
    }
    
}
