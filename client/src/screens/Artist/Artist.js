import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import theme from 'theme.js';

const ArtistContainer = styled(Box)`
  ${FADE_IN}
`;

const Artist = ({ artists, pending, match }) => {
  let artistName = match.params.name.replaceAll('-', ' ');
  let currentArtist = artists.filter((a) => a.artist_name === artistName)[0];

  if (pending || pending === undefined) {
    return <div>loading</div>;
  }

  return (
    <ArtistContainer style={{ margin: '50px auto', maxWidth: '720px' }} backgroundColor={`${theme.colors.etBlack}`}>
      <Flex color='black' width='100%' p='8px' justifyContent='center'>
        <Box borderRadius="50%" width="256px" height="256px" overflow='hidden' position='relative' boxShadow='8px 8px 0 #89DBFF' border="2px solid #89DBFF">
          <Image src={`/uploads/${currentArtist.artist_img}`} h='100%' w='100%' objectFit='cover' />
        </Box>
      </Flex>
      <Flex width='100%' justifyContent='center'>
        <Box width='80%'>
          <Text fontFamily='Spotify-Bold' color='white'>
            <b>{currentArtist.artist_name}</b>
          </Text>
          <Box color='black' width='100%' fontFamily='Spotify-Light' color='white'>
            {currentArtist.artist_bio}
          </Box>
        </Box>
      </Flex>
    </ArtistContainer>
  );
};

export default connect(
  (state) => ({
    artists: state.music.artists,
    updatedAt: state.music.updatedAt,
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  null,
)(Artist);
