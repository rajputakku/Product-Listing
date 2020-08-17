import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  Image,
  Button,
  Header,
  Input,
} from "semantic-ui-react";
import { products } from "./tanishq_products";
import LazyLoad from "react-lazyload";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
    };
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    const all_products = products
      .filter((data) => {
        if (this.state.search == null) return data;
        else if (
          data.category.toLowerCase().includes(this.state.search.toLowerCase())
        ) {
          return data;
        }
      })
      .filter((data) => data.avlble === 1)
      .map((data) => {
        return (
          <LazyLoad>
            <div style={{ marginBottom: 40 }}>
              <Card.Group>
                <Card style={{ width: 300, height: 480, margin: 40 }}>
                  <Image src={data.image} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{data.brand}</Card.Header>
                    <Card.Meta>
                      <span>{data.category}</span>
                    </Card.Meta>
                    <Card.Meta>
                      <span>{data.collection}</span>
                    </Card.Meta>
                    <Card.Description>{data.description}</Card.Description>
                    <Button variant="primary">WISHLIST</Button>
                  </Card.Content>
                </Card>
              </Card.Group>
            </div>
          </LazyLoad>
        );
      });

    return (
      <div>
        <Header as="h3" block className="main_header">
          Tanishq
        </Header>
        <Input
          type="text"
          placeholder="Search by category..."
          onChange={(e) => this.searchSpace(e)}
        />
        <Grid.Row style={{ marginLeft: 65 }}>{all_products}</Grid.Row>
      </div>
    );
  }
}

export default Main;
