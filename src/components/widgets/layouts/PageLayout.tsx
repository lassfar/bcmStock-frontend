
// ALERTS
import { useAppSelector } from '@/app/store/redux/hooks';
import Alert from '@/components/widgets/global/Alert';
import { IAlert } from '@/components/types/widgets/interfaces';
import { selectAlerts } from '@/app/store/redux/selectors/widgets/alert';

const PageLayout:React.FC<React.ReactNode> = ({children}) => {
  const alertList = useAppSelector<IAlert[]>(selectAlerts);
  return (
    <>
      <div className="alerts">
        {alertList?.map((alerty, key) => {
            return (
              <Alert {...alerty} key={key} />
            )
        })}
      </div>
      {children}
    </>
  )
}


export default PageLayout;