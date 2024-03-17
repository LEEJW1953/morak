import { ReactComponent as Delete } from '@/assets/icons/delete.svg';
import { UserChip, Modal } from '@/components';
import { useModal } from '@/hooks';
import { useKickMemberQuery } from '@/queries/hooks/group';

import * as styles from './index.css';

type GroupMemberProps = {
  id: string;
  memberId: string;
  userName?: string;
  profileSrc?: string;
  isOwner?: boolean;
};

export function GroupMember({
  id,
  memberId,
  userName,
  profileSrc,
  isOwner = false,
}: GroupMemberProps) {
  const { openModal } = useModal();
  const { mutate: kickMember } = useKickMemberQuery();

  const openKickModal = ({
    onClickConfirm,
  }: {
    onClickConfirm: () => void;
  }) => {
    openModal(
      <Modal
        title={`${userName}님을 강퇴하시겠습니까?`}
        buttonType="double"
        onClickConfirm={onClickConfirm}
      />,
    );
  };
  const onClickKick = () =>
    openKickModal({ onClickConfirm: () => kickMember({ id, memberId }) });

  return (
    <div className={styles.groupMember}>
      <UserChip username={userName} profileSrc={profileSrc} />
      {isOwner && (
        <button type="button" onClick={onClickKick}>
          <Delete className={styles.deleteButton} />
        </button>
      )}
    </div>
  );
}
