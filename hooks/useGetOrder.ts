import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ORDER = gql`query Orders($filter: CustomerOrdersFilterInput) {
    customer {
      orders(filter: $filter) {
        items {
          billing_address {
            city
            company
            country_code
            firstname
            lastname
            middlename
            postcode
            prefix
            region
            region_id
            street
            suffix
            telephone
            vat_id
          }
          carrier
          id
          invoices {
            comments {
              message
              timestamp
            }
            id
            items {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              id
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_invoiced
              order_item {
                selected_options {
                  label
                  value
                }
                id
                product_name
                product_sku
                product_sale_price {
                  currency
                  value
                }
              }
            }
            number
            total {
              base_grand_total {
                currency
                value
              }
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              grand_total {
                currency
                value
              }
              shipping_handling {
                amount_excluding_tax {
                  currency
                  value
                }
                amount_including_tax {
                  currency
                  value
                }
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                taxes {
                  amount {
                    currency
                    value
                  }
                  rate
                  title
                }
                total_amount {
                  currency
                  value
                }
              }
              subtotal {
                currency
                value
              }
              taxes {
                amount {
                  currency
                  value
                }
                rate
                title
              }
              total_shipping {
                currency
                value
              }
              total_tax {
                currency
                value
              }
            }
          }
          number
          payment_methods {
            additional_data {
              name
              value
            }
            name
            type
          }
          status
          total {
            base_grand_total {
              currency
              value
            }
            discounts {
              amount {
                currency
                value
              }
              label
            }
            grand_total {
              currency
              value
            }
            shipping_handling {
              amount_excluding_tax {
                currency
                value
              }
              amount_including_tax {
                currency
                value
              }
              
              total_amount {
                currency
                value
              }
            }
            subtotal {
              currency
              value
            }
            taxes {
              rate
              title
            }
            total_shipping {
              currency
              value
            }
            total_tax {
              currency
              value
            }
          }
          shipping_address {
            city
            company
            country_code
            fax
            firstname
            lastname
            middlename
            postcode
            prefix
            region
            region_id
            street
            suffix
            telephone
            vat_id
          }
          shipping_method
          shipments {
            comments {
              message
              timestamp
            }
            id
            items {
              id
              order_item {
                discounts {
                  amount {
                    currency
                    value
                  }
                  label
                }
                entered_options {
                  label
                  value
                }
                gift_message {
                  from
                  message
                  to
                }
                id
                product_name
                product_sku
                product_type
                product_url_key
                quantity_canceled
                quantity_invoiced
                quantity_ordered
                quantity_refunded
                quantity_returned
                quantity_shipped
                selected_options {
                  label
                  value
                }
                status
              }
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_shipped
            }
            number
            tracking {
              carrier
              number
              title
            }
          }
          items {
            id
            product_name
            product_sku
            product_type
            status
            selected_options {
              label
              value
            }
            quantity_invoiced
            quantity_ordered
            ... on OrderItem {
              selected_options {
                label
                value
              }
              status
              quantity_ordered
              quantity_invoiced
              product_type
              product_sku
              product_name
              id
            }
          }
        }
        total_count
      }
    }
  }`;

  const useGetOrder = (filter:any) => {
      
    
  //   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );
  
      const getOrder = useLazyQuery( 
          GET_ORDER, { 
          errorPolicy: "ignore",
          variables: filter
          });
  
      // console.log(getBasket?.data?.customerCart?.id);
      /* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */
  
      return getOrder;
  
  };
  
  export default useGetOrder;