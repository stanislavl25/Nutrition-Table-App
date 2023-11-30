import {
  Button,
  Card,
  List,
  Page,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";
import React from "react";

function Documentation() {
  return (
    <Page title="How to use our App">
      <Card sectioned title="Getting Started">
        <TextContainer>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <TextStyle>
              Welcome! We are glad that you have installed our app 🎉
            </TextStyle>
          </div>
          <List type="number">
            <TextContainer spacing="loose">
              <List.Item>
                <TextStyle>
                  To get the most out of this app, please make sure you read the
                  two sections 'Getting Started' and 'Label creation steps'
                  carefully. This only takes 5 minutes and will make the process
                  much easier for you.
                </TextStyle>
              </List.Item>
              <List.Item>
                <TextStyle>
                  You need products in your shop for which you want to add a
                  nutritional table. If you don't have any products yet, add
                  them to your Store using the{" "}
                  <Button plain>Shopify Admin.</Button>
                </TextStyle>
              </List.Item>
              <List.Item>
                <TextStyle>
                  Add labels to your products. You can read how this works under
                  'label creation steps'.
                </TextStyle>
              </List.Item>
              <List.Item>
                <TextStyle>
                  Add the nutritional table to the frontend of your store. You
                  can read how this works under 'Adding the nutrition table to
                  your Theme'.
                </TextStyle>
              </List.Item>
              <List.Item>
                <TextStyle>
                  Enjoy your new, responsive and beautiful nutritional tables ☺️
                </TextStyle>
              </List.Item>
            </TextContainer>
          </List>
          <div style={{ marginTop: "20px" }}>
            {" "}
            <TextStyle>
              Questions? - Read the other articles in this documentation or
              contact our support team.
            </TextStyle>
          </div>
        </TextContainer>
      </Card>
      <Card sectioned title="Label creation steps">
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <TextStyle>
            How to create nutrition tables and add data to your products.
          </TextStyle>
        </div>

        <List type="number">
          <List.Item>
            <TextStyle>
              Start by going to the products tab of our app and selecting the
              products you want to add information for. You can select a single
              product or edit multiple products at the same time in bulk action.
              Here you can filter by products and categories and flexibly put
              together the selection of your products that you want to edit. Of
              course you can also select and edit all products.
            </TextStyle>
          </List.Item>
          <List.Item>
            <TextStyle>
              Once you have selected one or more products, the 'Create Label'
              button will take you to the page where you can add and edit the
              information for this/these product/s. Depending on your country
              and pricing plan, you have various options for selecting and
              entering nutritional information. For help, click on the small
              tooltips next to the input fields. You can recognize them by the
              small ‘i’ symbols.
            </TextStyle>
          </List.Item>
          <List.Item>
            <TextStyle>
              Check the preview of your data on the right as you type. This
              shows you how the information will later be displayed for this/s
              product/s in your shop (Note: You can still adjust the visual
              appearance of the table in the theme editor).
            </TextStyle>
          </List.Item>
          <List.Item>
            <TextStyle>
              When you are done and have entered all the information, save the
              information using the 'safe label' button in the top right.
            </TextStyle>
          </List.Item>
        </List>
      </Card>
      <Card sectioned title="Adding the nutrition table to your Theme">
        <TextContainer spacing="loose">
          <div>
            {" "}
            <TextStyle>
              We use Theme App Extensions to display the nutrition value table
              in the frontend of your online shop. This means that you don't
              need to make any manual changes to the code to add the nutrition
              value table to your online store's design.
            </TextStyle>
          </div>
          <div>
            <TextStyle>How it works:</TextStyle>
          </div>
          <List type="number">
            <List.Item>
              <TextStyle>
                Switch to the Shopify admin and select 'Online Store' &gt;
                'Themes' in the left main menu.
              </TextStyle>
            </List.Item>

            <List.Item>
              <TextStyle>
                Select the theme you want to add the nutritional table to and
                click 'customize'.
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Select the product template that you want to edit.
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Add the Nutrition Facts section of our app under 'Add section'
                on the left. (Note: based on your current pricing plan, you may
                see multiple app sections. Simply select the section that best
                suits your needs).
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Customize the section and nutritional table according to your
                wishes and the corporate design of your store.
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Save your changes so that they appear in your store 🎉
              </TextStyle>
            </List.Item>
          </List>
        </TextContainer>
      </Card>
      <Card sectioned title="Recommended Intake">
        <TextContainer>
          <div>
            <TextStyle>
              The recommended dietary intake (RDI), often referred to as a
              recommended daily intake, is the average daily intake of a given
              nutrient that is likely to meet the nutrient needs of 97-98% of
              healthy individuals at a given life stage or gender group.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              To find an RDI for a specific nutrient, please familiarize
              yourself with the recommendations and regulations in your country.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              Recommended daily intake amounts are already stored in our app. We
              have put these together to the best of our knowledge and belief.
              Since this information varies from country to country, please make
              sure you familiarize yourself with the applicable laws in your
              country. We assume no liability for this information and its
              application in different countries.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              Please note that these estimates are for healthy people and are
              not appropriate for people with various diseases or conditions,
              premature babies, or those with special nutritional needs.
            </TextStyle>
          </div>
        </TextContainer>
        <div>
          <TextStyle>Here you can find further information:</TextStyle>
        </div>
        <br />
        <List type="bullet">
          <div>
            <List.Item>
              <TextStyle>
                United States |{" "}
                <a href="#" style={{ textDecoration: "none" }}>
                  <span> U.S. Department of Health & Human Services</span>
                </a>
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Canada |{" "}
                <a href="#" style={{ textDecoration: "none" }}>
                  <span> Government of Canada</span>
                </a>
              </TextStyle>
            </List.Item>
            <List.Item>
              <TextStyle>
                Europe |
                <a href="#" style={{ textDecoration: "none" }}>
                  <span> European Food Safety Authority</span>
                </a>
              </TextStyle>
            </List.Item>
          </div>
        </List>
      </Card>
      <Card sectioned title="Prepared Products">
        <TextContainer>
          <div>
            <TextStyle>
              The nutritional values ​​of a food are normally related to the
              product as it is in the packaging (unprepared product).
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              In some countries, however, food laws allow the nutritional
              information to be related to the prepared food, provided that
              sufficiently detailed information is given about the method of
              preparation.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              Both options for nutritional labeling are therefore permissible.
              In the second variant, however, the supplier must describe the
              preparation in sufficient detail. So he has to state how much
              water or other ingredients should be added, if necessary, and
              whether the food needs to be boiled or baked, for example - and if
              so, for how long.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              In our app you have the option of entering the nutritional
              information for a prepared portion. This is marked and labeled
              accordingly in your shop so that you can meet all the necessary
              specifications here.
            </TextStyle>
          </div>
          <div>
            <TextStyle>
              Please find out beforehand from your responsible food authority
              whether such a representation is permitted in your country.
            </TextStyle>
          </div>
        </TextContainer>
      </Card>
      <Card sectioned title="Nutri Score">
        <div>
          <TextContainer>
            <div>
              <TextStyle>
                The Nutri-Score uses a 5-level color scale from A to E to
                provide information about the nutritional value of a food. The
                green A stands for a more favorable, the red E for a less
                favorable nutritional value of the respective product and
                enables comparisons within the respective product group. The
                Nutri-Score is therefore a useful supplement to the information
                required by law, such as a list of ingredients and a nutritional
                value table.
              </TextStyle>
            </div>
            <div>
              <TextStyle>
                The Nutri-Score can currently be used on a voluntary basis in
                Germany, France, Belgium, Switzerland and Luxembourg. Other EU
                countries such as the Netherlands and Spain are also planning to
                introduce it.
              </TextStyle>
            </div>
            <div>
              <TextStyle>
                Food companies can use the Nutri-Score free of charge. All you
                need to do is register and agree to the user agreement with the
                responsible authority.
              </TextStyle>
            </div>
            <div>
              <TextStyle>
                Many manufacturers already rely on the Nutri Score. If the
                products you are selling already have a Nutri Score, you can
                also use them in your online shop. If the products do not yet
                have a Nutri Score, you or the manufacturer can apply for one
                from the{" "}
                <a href="#" style={{ textDecoration: "none" }}>
                  {" "}
                  <span>responsible authority.</span>
                </a>
              </TextStyle>
            </div>
          </TextContainer>
        </div>
      </Card>
      <Card sectioned title="Abbreviations">
        <TextContainer>
          <TextStyle>
            %RI = %DI = percentage of the recommended daily intake
          </TextStyle>
        </TextContainer>
      </Card>
    </Page>
  );
}

export default Documentation;
