import { AudioEmbedProps } from 'components/ACR/AudioEmbed/AudioEmbed.props';
import { useRouter } from 'next/router';
import Script from 'next/script';
import config from 'temp/config';

const AudioEmbed = (props: AudioEmbedProps): JSX.Element => {
  const { fields, testId } = props;
  const router = useRouter();
  const publicUrl = config.publicUrl;
  const currentPageUrl = `${publicUrl}${router.asPath}`;
  const encodedUrl = encodeURI(currentPageUrl);
  const { playerId } = fields ?? {};
  const url = `https://trinitymedia.ai/player/trinity/${playerId?.value}/?pageURL=${encodedUrl}`;

  return (
    <div data-ref="audio-embed" data-testid={testId}>
      <Script src={url}></Script>
    </div>
  );
};

export default AudioEmbed;
