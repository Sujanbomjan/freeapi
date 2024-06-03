import Image from "next/image";
import React from "react";

interface ToyCardProps {
  name: string;
  image: string;
  type: string[];
  base_experience: number;
  abilities: string[];
}

const ToyCard: React.FC<ToyCardProps> = ({
  name,
  image,
  type,
  base_experience,
  abilities,
}) => {
  return (
    <div className="w-full px-2 mb-5">
      <div className="border border-gray-300 rounded-lg">
        <div className="overflow-hidden rounded-t-lg">
          <Image src={image} alt={`${name}`} className="w-full" width={100} height={100} />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <div className="flex flex-wrap mb-2">
            {type.map((t, index) => (
              <span
                key={index}
                className="bg-gray-200 py-1 px-2 mr-2 mb-2 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm mb-2">
            <strong>Base Experience:</strong> {base_experience}
          </p>

          <div className="text-sm">
            <p className="font-semibold mb-1">Abilities:</p>
            <ul>
              {abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
