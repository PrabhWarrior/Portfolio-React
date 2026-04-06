import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 20,
    flexDirection: 'column',
    fontSize: '1.2em',
    fontWeight: 500,
    width: '800px'
  },
  introImageContainer: {
    // margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  introImage: {
    border: '5px solid black',
    height: '200px',
    width: '200px',
    borderRadius: '200px' 
  }
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div>
          {data
            ? (
              <Fade>
                  <Col style={styles.introImageContainer}>
                    <img style={styles.introImage} src={data?.imageSource} alt="profile" />
                  </Col>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
              </Fade>
            )
            : <FallbackSpinner />}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
