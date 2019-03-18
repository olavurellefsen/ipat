export default {
  scenarioCombinations : {
    populationOptions : [
      { "id": 0, "short_description": "no change", "long_description": "No change from 2015" },
      { "id": 1, "short_description": "ssp1 population", "long_description": "Low fertility in current low and medium income countries, medium fertility in current rich OECD countries" },
      { "id": 2, "short_description": "ssp2 population", "long_description": "Medium fertility in all countries" },
      { "id": 3, "short_description": "ssp3 population", "long_description": "High fertility in current low and medium income countries, low fertility in current rich OECD countries" },
      { "id": 4, "short_description": "ssp4 population", "long_description": "High fertility in current low income countries, low fertility in current rich countries and medium in rich OECD countries" },
      { "id": 5, "short_description": "ssp5 population", "long_description": "Low fertility in current low and medium income countries, high fertility in current rich OECD countries" },
      { "id": 6, "short_description": "low fertility", "long_description": "Low fertility, immediately fall to < 1.5 birth per woman in all countries" }
    ],
    affluenceOptions : [
      { "id": 0, "short_description": "no change", "long_description": "No change from 2015, constant in each region on the level of 2015" },
      { "id": 1, "short_description": "economic crisis", "long_description": "Crisis until 2050, stronger in high income countries, and then slow recover" },
      { "id": 2, "short_description": "equality", "long_description": "All regions reach by 2100 the level of USA in 2015" },
      { "id": 3, "short_description": "catching up", "long_description": "Continuing historic growth rates until 2050, after 2050 the current low income countries catch up with current high income countries" },
      { "id": 4, "short_description": "shifting power", "long_description": "Low economic growth in current high income countries and high growth in current low income countries" },
      { "id": 5, "short_description": "ssp1 affluence", "long_description": "High growth in current low and medium income countries, medium growth in current high income countries" },
      { "id": 6, "short_description": "ssp2 affluence", "long_description": "Medium economic growth in all countries" },
      { "id": 7, "short_description": "ssp3 affluence", "long_description": "Low economic growth in all countries" },
      { "id": 8, "short_description": "ssp4 affluence", "long_description": "Low economic growth in current low income countries, medium growth in other" },
      { "id": 9, "short_description": "ssp5 affluence", "long_description": "High economic growth in all countries" }
    ],
    technologyOptions : [
      { "id": 0, "short_description": "business as usual", "long_description": "No policies or targets implemented, competitive markets secure global cost minimized solution" },
      { "id": 1, "short_description": "strong tech dev", "long_description": "90% non-fossil power, 50% non-fossil primary energy in 2050. More than 90% non-fossil primary energy in 2100" },
      { "id": 2, "short_description": "radical tech dev", "long_description": "100% non-fossil power, 85% non-fossil primary energy in 2050. 95% non-fossil primary energy in 2100" }
    ],
    dietOptions : [
      { "id": 0, "short_description": "usa diet", "long_description": "USA or EU diet in all countries, transition over 20 years" },
      { "id": 1, "short_description": "ind diet", "long_description": "Indian diet in all countries, transition over 20 years" },
      { "id": 2, "short_description": "no change", "long_description": "No change from today" }
    ]
  }
};