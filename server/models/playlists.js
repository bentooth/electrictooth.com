const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistsSchema = new Schema({
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Tracks' }],
});

const Playlists = mongoose.model('Playlists', PlaylistsSchema);

module.exports = Playlists;
