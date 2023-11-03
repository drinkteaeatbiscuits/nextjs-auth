import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ME = gql`
  query Me {
    customer{
      email
      wishlists {
        id
        items_v2 {
            items {
              id
                product {
                    uid
            name
            sku
            url_key
            only_x_left_in_stock
            stock_status
            thumbnail {
              disabled
              label
              position
              url
              }
            
            options_container
          
                ... on ConfigurableProduct {
              canonical_url
              configurable_options {
                attribute_code
                label
                values {
                  default_label
                  label
                  store_label
                  use_default_value
                }
                uid
                use_default
              }
              options {
                title
                }
                variants {
                attributes {
                code
                label
                uid
                }
                product {
                  name
                  sku
                  uid
                  only_x_left_in_stock
                  stock_status
                  image {
                    disabled
                    label
                    position
                    url
                  }
                  thumbnail {
                    disabled
                    label
                    position
                    url
                  }
                  price_range {
                    maximum_price {
                        discount {
                        amount_off
                        percent_off
                        }
                        final_price {
                        currency
                        value
                        }
                        fixed_product_taxes {
                        amount {
                            currency
                            value
                        }
                        label
                        }
                        regular_price {
                        currency
                        value
                        }
                    }
                    minimum_price {
                      discount {
                        amount_off
                        percent_off
                      }
                      final_price {
                        currency
                        value
                      }
                      fixed_product_taxes {
                        amount {
                          currency
                          value
                        }
                        label
                      }
                      regular_price {
                        currency
                        value
                      }
                    }
                  }
                }
              }
            
            }
            ... on VirtualProduct {
              stock_status
              price_range {
                maximum_price {
                discount {
                  amount_off
                  percent_off
                }
                }
                minimum_price {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  currency
                  value
                }
                fixed_product_taxes {
                  amount {
                  currency
                  value
                  }
                  label
                }
                regular_price {
                  currency
                  value
                }
                }
              }
            }
            ... on SimpleProduct {
              stock_status
              price_range {
                  maximum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      value
                      currency
                    }
                    label
                  }
                  regular_price {
                      currency
                      value
                  }	
                
                  }
                  minimum_price {
                  final_price {
                      currency
                      value
                  }
                  regular_price {
                      currency
                      value
                  }
                  }	
                
              }
            }
            ... on VirtualProduct {
              stock_status
              price_range {
                  maximum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      value
                      currency
                    }
                    label
                  }
                  regular_price {
                      currency
                      value
                  }	
                
                  }
                  minimum_price {
                  final_price {
                      currency
                      value
                  }
                  regular_price {
                      currency
                      value
                  }
                  }	
                
              }
            }
            
                          image {
                              disabled
                              label
                              position
                              url
                          }
                          thumbnail {
                              disabled
                              label
                              position
                              url
                }
              }
          }
          
        
              }
          }
      
    }
  }
`;

const useGetMe = () => {

  return useLazyQuery(GET_ME, { errorPolicy: "all" });

};

export default useGetMe;
