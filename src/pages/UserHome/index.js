import React, { useEffect, useMemo, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModelItemFieldItems } from '../../store/userDashboard/actions';
import { Stage, Layer, Star, Text, Shape, Image  } from 'react-konva';
import { Doughnut } from 'react-chartjs-2';

import konva from 'konva';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

class App extends Component {
  state = {
    ref: React.createRef()
  }
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  data = (canvas) => {
    this.setState({canvas});
    return {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.context) {
      return
    }
  }

  componentDidMount() {



  }

  draw = (ref) => {
    console.log(ref.chartInstance);

    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    var image = new Konva.Image({
      image: ref.chartInstance.canvas,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    });

    var tr = new Konva.Transformer();
    tr.attachTo(image);
    layer.add(tr);
    // layer.draw();
    // layer.add(image);


    layer.batchDraw();
  }

  render() {
    console.log(this.ref)
    return (
      <>
        <div id={'container'}>

        </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try to drag a star" />
          <Image
            image={
              this.ref
            }

            fill="#00D2FF"
            stroke="black"
            strokeWidth={4}

            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            opacity={0.8}
            draggable
            rotation={Math.random() * 180}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            />
        </Layer>
      </Stage>
      <Doughnut data={data} width={100} height={100} ref={(ref) => this.draw(ref)} />
      </>
    );
  }
}



const UserHome = ({ getModelItemFieldItems }) => {
  useEffect(() => {
    getModelItemFieldItems()
  }, []);

  return (
    <div>
      <div >
        dashboard
        {/*<Doughnut data={data} width={100} height={100} />*/}
        <App />
      </div>
    </div>
  );
};

UserHome.propTypes = {
  getModelItemFieldItems: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch) => ({
  getModelItemFieldItems: () => dispatch(getModelItemFieldItems()),
});

export default connect(null, mapDispatchToPros)(UserHome);
