import { useEffect, useState } from 'react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import defaultProfileImageOne from '@assets/png/default-profile-1.png'
import NextIcon from '@assets/svg/nextArrow.svg?react'
import PrevIcon from '@assets/svg/prevArrow.svg?react'
import VoteResults from './vote'
import PinIcon from '@assets/svg/Pin.svg?react'
import { photoList } from './mockdata'
import { Link } from 'react-router-dom'

interface PhotoType {
  id: number
  nickname: string
  regionName: string
  type: string
  ImgUrl: string
  content: string
  date: string
  profileImg?: string
}

interface PhotoDetailProps {
  photoInfo: PhotoType
  onClose: () => void
}

// const PhotoDetail = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [hasVoted, setHasVoted] = useState(false)
const PhotoDetail: React.FC<PhotoDetailProps> = ({
  photoInfo,
  onClose,
}: {
  onClose: () => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [photo, setPhoto] = useState<PhotoType | null>(null)

  const images = [photoInfo.ImgUrl, defaultProfileImageOne]

  useEffect(() => {
    setPhoto(photoInfo.ImgUrl)
    console.log('photoInfo', photoInfo)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const handleVote = () => {
    setHasVoted(true)
    setCurrentIndex(0)
  }

  return (
    <div>
      <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'>
        <div
          className='bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[35%] lg:w-[25%] relative'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-center items-center mb-4 gap-2'>
            <PinIcon
              width={20}
              height={20}
            />
            <p className='font-bold text-lg'>{photoInfo.regionName}</p>
          </div>
          <div className='flex justify-between  py-3 items-center'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={photoInfo.profileImg || defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>
                  {photoInfo.nickname}
                </p>
                <div className='flex text-[10px] text-darkGray gap-2'>
                  <p>1시간 전</p>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2 text-darkGray pb-4 text-xs mx-5'>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <div className='h-[40vh] relative flex items-center justify-center'>
            <button
              onClick={handlePrev}
              className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center z-10'
            >
              <PrevIcon
                width={15}
                height={15}
              />
            </button>
            <img
              src={images[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className='w-full h-full object-cover rounded-md'
            />
            <button
              onClick={handleNext}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 '
            >
              <NextIcon
                width={15}
                height={15}
              />
            </button>
          </div>
          <p className='font-bold text-sm text-black mt-4'>
            {photoInfo.content}
          </p>
          {/* 투표 UI */}
          <div className='mt-4  p-2'>
            {!hasVoted ? (
              // 투표 전 UI
              <div className='flex flex-col border-t pt-2 items-center gap-3'>
                <div className='flex gap-4 pt-4 items-center'>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={handleVote}
                  >
                    첫 번째 사진
                  </button>
                  <p className='font-bold text-lg'>VS</p>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={handleVote}
                  >
                    두 번째 사진
                  </button>
                </div>
              </div>
            ) : (
              // 투표 후 UI
              <VoteResults />
            )}
          </div>
          <div className='flex w-full justify-center'>
            <button
              onClick={onClose}
              className='mt-4 mx-8'
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
