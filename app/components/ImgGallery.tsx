import apiCalls from "@/graphql";
import { MissionItem, ShipItem } from "@/util/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

export type ImageGalleryProps = {
  shipItems: any[];
};

export default function ImageGallery(props: ImageGalleryProps) {
  const { shipItems } = props;
  const shipItemsCp = [...shipItems] as ShipItem[];

  const [getMissions, { loading, error, data }] = useLazyQuery<{ missions: MissionItem[] }>(apiCalls.queries.missions);

  const [showModal, setShowModal] = useState(false);
  const [curShip, setShip] = useState<ShipItem | null | undefined>();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 transition ease-in-out">
        {
          shipItemsCp.map((ship, ix) => (
            <div key={`${ship.id}-${ix}`}>
              <img className="h-auto max-w-full rounded-lg transition ease-in-out hover:-translate-y-1  hover:scale-150 cursor-pointer"
                src={ship.image ?? 'https://placehold.co/600x400'}
                onClick={() => {
                  getMissions({ variables: { shipId: ship.id } });
                  setShowModal(true);
                  setShip(ship);
                }}
              />
            </div>
          ))
        }
      </div>

      {loading && (
        <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 10000 }}>
          <svg aria-hidden="true" role="status" className="inline w-10 h-10 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
        </div>
      )}

      {!loading && data && showModal && (
        <div id="default-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {curShip?.name} Missions
                </h3>
                {curShip?.image && <img src={curShip.image} className="rounded-full h-auto max-w-lg ms-auto w-24 h-24" />}
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  {
                    data?.missions?.map(m => {
                      return <li key={m.id}>{`${m.name}, its destination was ${m.destination}, carrying ${m.cargo}`}</li>
                    })
                  }
                </ul>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => setShowModal(false)}
                  data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

