<?php
require_once('lib/apiTwitter/Phirehose.php');
require_once('lib/apiTwitter/OauthPhirehose.php');

// The OAuth credentials you received when registering your app at Twitter
	define("TWITTER_CONSUMER_KEY", "8CWMHPpeVBjsoFOWCzZQjzB7T");
	define("TWITTER_CONSUMER_SECRET", "ZW3KoVCs5yHRfew2bDp8yGFisklqmSe2rH85yOnAW5QRZRauXm");


	// The OAuth data for the twitter account
	define("OAUTH_TOKEN", "2494404708-Wc3mUr3HKyQt1CutpGdE0pT5DEgjOimHWnaxMp8");
	define("OAUTH_SECRET", "dlBJCEytVBibXJKvqh0W6Jq1EbVvgsxbiuJOFV8uwAUD4");

/**
 * Example of using Phirehose to display a live filtered stream using track words 
 */
class FilterTrackConsumer extends OauthPhirehose
{
	
	
  /**
   * Enqueue each status
   *
   * @param string $status
   */
  public function enqueueStatus($status)
  {
    /*
     * In this simple example, we will just display to STDOUT rather than enqueue.
     * NOTE: You should NOT be processing tweets at this point in a real application, instead they should be being
     *       enqueued and processed asyncronously from the collection process. 
     */
    $data = json_decode($status, true);
    if (is_array($data) && isset($data['user']['screen_name'])) {
      print $data['user']['screen_name'] . ': ' . print($data['user']['location']) . "\n<br />";
    }
  }
  
}


// Start streaming
$sc = new FilterTrackConsumer(OAUTH_TOKEN, OAUTH_SECRET, Phirehose::METHOD_FILTER);
$sc->setTrack(array('manger'));
$sc->consume();

