import type { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  roomId: string;
};

const CopyLink: FC<Props> = ({ roomId }) => {
  const shareUrl = `${window.location.origin}/vote/${roomId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast('링크가 복사되었습니다!', {
        description: '친구들에게 링크를 공유해보세요. 🔗',
      });
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="space-y-2 pt-4 px-5">
      <p className="text-center text-xs text-(--text-sub)">아래 박스를 누르면 링크가 바로 복사됩니다.</p>
      <div
        className="flex items-center justify-between p-4 bg-white border border-(--border-color) rounded-md shadow-sm active:scale-95 transition-transform cursor-pointer"
        onClick={handleCopyLink}
      >
        <span className="text-(--text-main) font-medium truncate mr-4">{shareUrl}</span>
        <button className="text-emerald-400 font-bold shrink-0">COPY</button>
      </div>
    </div>
  );
};

export default CopyLink;
