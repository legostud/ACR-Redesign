export const getStateCountryQuery = (itemId: string, language?: string): string => {
  const query = `query {
        search(where:{
          AND:[{
                name: "_path",
                value: "${itemId}",
                operator: CONTAINS
              },
              {
                 name: "_templates",
                 value: "{D2923FEE-DA4E-49BE-830C-E27764DFA269}",
                 operator: CONTAINS
               },
              { name: "_language",  value: "${language}" }]
        }, first : 100){
          total
           pageInfo {
            endCursor
            hasNext
          }
          results {
            ...on Enum {
              name
              value {
                value
              }
            }
          }
        }
      }`;
  if (!language) {
    language = 'en';
  }

  return query;
};

export const getSealsQuery = (language?: string): string => {
  const query = `query {
    search(where:{
      AND:[{
            name: "_path",
            value: "{3A39C865-A441-4E31-B16C-C4CB7D3C44DF}",
            operator: CONTAINS
          },
         {
            name: "_templates",
            value: "{FBC36D10-AB8D-4173-936D-E1B875638062}",
            operator: CONTAINS
          },
          { name: "_language",  value: "${language}" }]
    }, first : 100){
      total
       pageInfo {
        endCursor
        hasNext
      }
      results {
        ... on FacilitySearchSeal {
          code {value}
          sealImage { jsonValue}
        }
      }
    }
  }`;
  if (!language) {
    language = 'en';
  }

  return query;
};
